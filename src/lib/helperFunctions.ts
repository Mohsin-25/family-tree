export function allowOnlyMentionedRegex(allowedRegex: RegExp) {
  const regex = new RegExp(
    `[^${allowedRegex?.source?.replace(/^\[|\]$/g, "")}]`,
    "g",
  );

  return (e: React.FormEvent<HTMLInputElement>) => {
    const target = e?.currentTarget;
    target.value = target?.value?.replace(regex, "");
  };
}
