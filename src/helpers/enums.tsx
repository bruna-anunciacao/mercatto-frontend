export const StateEnums = [
  { option: "AC" },
  { option: "AL" },
  { option: "AP" },
  { option: "AM" },
  { option: "BA" },
  { option: "CE" },
  { option: "DF" },
  { option: "ES" },
  { option: "GO" },
  { option: "MA" },
  { option: "MT" },
  { option: "MS" },
  { option: "MG" },
  { option: "PA" },
  { option: "PB" },
  { option: "PR" },
  { option: "PE" },
  { option: "PI" },
  { option: "RJ" },
  { option: "RN" },
  { option: "RS" },
  { option: "RO" },
  { option: "RR" },
  { option: "SC" },
  { option: "SP" },
  { option: "SE" },
  { option: "TO" },
];
interface Option {
  option: string;
}

export const selectedOption = (option: Option) => {
  return (
    <div>
      <div>{option.option}</div>
    </div>
  );
};
