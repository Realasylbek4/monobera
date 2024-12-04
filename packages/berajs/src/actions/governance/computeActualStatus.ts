import { governanceAccelerateProposal } from "@bera/config";
import {
  ProposalSelectionFragment,
  ProposalStatus,
} from "@bera/graphql/governance";

import { ProposalState } from "~/types";

export const MOCKED_PROPOSAL_STATUSES: readonly ProposalStatus[] = [
  ProposalStatus.Active,
  ProposalStatus.PendingQueue,
  ProposalStatus.PendingExecution,
  ProposalStatus.Defeated,
  ProposalStatus.QuorumNotReached,
];

export function computeActualStatus(
  proposal: ProposalSelectionFragment,
  currentBlock: bigint,
  /**
   * Value returned by the `state` function of the governance contract.
   */
  proposalState?: ProposalState,
): ProposalStatus {
  /**
   * If the proposal state is provided, we can use it for early return.
   */
  if (proposalState !== undefined) {
    if (proposalState === ProposalState.Canceled) {
      if (proposal.voteStartBlock < currentBlock)
        return ProposalStatus.CanceledByUser;
      return ProposalStatus.CanceledByGuardian;
    }
    if (proposalState === ProposalState.Defeated) {
      if (!proposal.pollResult) {
        // Poll result is created after first vote.
        return ProposalStatus.QuorumNotReached;
      }

      if (
        BigInt(proposal.quorum) > BigInt(proposal.pollResult.totalTowardsQuorum)
      ) {
        return ProposalStatus.QuorumNotReached;
      }
      return ProposalStatus.Defeated; //
    }

    if (proposalState === ProposalState.Succeeded)
      return ProposalStatus.PendingQueue;
    if (proposalState === ProposalState.Queued) {
      if (proposal.queueEnd < currentBlock) {
        return ProposalStatus.PendingExecution;
      }
      return ProposalStatus.InQueue;
    }

    if (proposalState === ProposalState.Expired) {
      console.warn("Unexpected expired stato on proposal id: ", proposal.id);
      return ProposalStatus.Defeated;
    }

    const map = {
      [ProposalState.Pending]: ProposalStatus.Pending,
      [ProposalState.Active]: ProposalStatus.Active,
      [ProposalState.Executed]: ProposalStatus.Executed,
    };
    return map[proposalState];
  }

  /*
   * If the proposal state is not provided, we need to compute it from subgraph data.
   */

  if (proposal.status === ProposalStatus.InQueue) {
    if (proposal.queueEnd < currentBlock) {
      return ProposalStatus.PendingExecution;
    }
  }

  if (
    governanceAccelerateProposal &&
    proposalState === ProposalState.Active &&
    BigInt(proposal.quorum) < BigInt(proposal.pollResult.totalTowardsQuorum) &&
    Number(proposal.pollResult.forPercentage) >
      Number(proposal.pollResult.againstPercentage)
  ) {
    return ProposalStatus.PendingQueue;
  }

  if (proposal.status === ProposalStatus.Pending) {
    if (
      BigInt(proposal.voteStartBlock) < currentBlock &&
      BigInt(proposal.voteEndBlock) > currentBlock
    ) {
      return ProposalStatus.Active;
    }

    if (proposal.voteEndBlock < currentBlock) {
      if (!proposal.pollResult) {
        // Poll result is created after first vote.
        return ProposalStatus.QuorumNotReached;
      }

      if (
        BigInt(proposal.quorum) > BigInt(proposal.pollResult.totalTowardsQuorum)
      ) {
        return ProposalStatus.QuorumNotReached;
      }

      if (proposal.pollResult?.against > proposal.pollResult?.for) {
        return ProposalStatus.Defeated;
      }

      return ProposalStatus.PendingQueue;
    }
    return ProposalStatus.Pending;
  }

  if (proposal.status === ProposalStatus.InQueue) {
    if (proposal.queueEnd < Date.now() / 1000) {
      return ProposalStatus.PendingExecution;
    }
  }

  return proposal.status;
}
