import { Button } from "@bera/ui/button";

import { Input, InputWithLabel } from "@bera/ui/input";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import {
  CustomProposal,
  CustomProposalErrors,
  ProposalErrorCodes,
} from "~/app/governance/types";
import {
  checkProposalField,
  getBodyErrors,
  type useCreateProposal,
} from "~/hooks/useCreateProposal";
import { MDXEditor } from "./mdx-editor";
import { Label } from "@bera/ui/label";
import { FormError } from "@bera/ui/form-error";

export const CreateProposalBody = ({
  proposal,
  setProposal,
  errors,
  setErrors,
  onNext,
}: {
  proposal: CustomProposal;
  setProposal: ReturnType<typeof useCreateProposal>["setProposal"];
  onNext: () => void;
  errors: CustomProposalErrors;
  setErrors: Dispatch<SetStateAction<CustomProposalErrors>>;
}) => {
  const handleNext = useCallback(() => {
    const e: CustomProposalErrors = {};

    e.title = checkProposalField("title", proposal.title);
    e.description = checkProposalField("description", proposal.description);
    e.forumLink = checkProposalField("forumLink", proposal.forumLink);

    setErrors(e);

    if (e.title || e.description || e.forumLink) {
      return;
    }

    onNext();
  }, [onNext]);

  return (
    <div className="grid grid-cols-1 justify-start gap-6">
      <InputWithLabel
        label="Title"
        error={
          errors.title === ProposalErrorCodes.REQUIRED
            ? "Title must be filled"
            : errors.title
        }
        variant="black"
        type="text"
        id="proposal-title"
        placeholder="Ooga booga"
        value={proposal.title}
        onChange={(e) =>
          setProposal((prev: any) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />

      <div className="grid grid-cols-1 gap-y-2">
        <Label>Description</Label>

        <MDXEditor
          className="dark-theme dark-editor border border-border h-32 overflow-y-scroll rounded-md placeholder:text-sm"
          contentEditableClassName="placeholder:text-sm"
          markdown={proposal.description}
          placeholder="Tell us about your proposal"
          onChange={(e) => {
            console.log("e", e);
            setProposal((prev: any) => ({
              ...prev,
              description: e,
            }));
          }}
        />

        <FormError>
          {errors.description === ProposalErrorCodes.REQUIRED
            ? "Description must be filled"
            : errors.description}
        </FormError>
      </div>
      <InputWithLabel
        label="Forum Link"
        error={
          errors.forumLink === ProposalErrorCodes.REQUIRED
            ? "Forum link must be filled"
            : errors.forumLink === ProposalErrorCodes.INVALID_ADDRESS
              ? "Invalid URL"
              : errors.forumLink === ProposalErrorCodes.MUST_BE_HTTPS
                ? "Forum link must start with HTTPS"
                : errors.forumLink
        }
        type="text"
        variant="black"
        id="proposal-forumLink"
        placeholder="https://forum.berachain.com/...."
        value={proposal.forumLink}
        onChange={(e: any) => {
          setProposal((prev: any) => ({
            ...prev,
            forumLink: e.target.value,
          }));
          setErrors((errs) => ({
            ...errs,
            forumLink: checkProposalField("forumLink", e.target.value),
          }));
        }}
      />

      <div className="flex justify-end">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};
