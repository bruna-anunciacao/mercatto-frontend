// Components

// Images
import { Person, Home } from "@mui/icons-material";
// Imports

// Styles
import s from "./registerStepForm.module.scss";

export default function RegisterStepForm({ stepForm }: { stepForm: number }) {
  return (
    <div className={s.wrapperAllSteps}>
      <div className={s.wrapperEachCounter}>
        <div className={stepForm >= 0 ? `${s.circleStep} ${s.optionActive}` : `${s.circleStep} ${s.optionInactive}`}>
          <Person />
        </div>
        <div className={stepForm > 0 ? `${s.lineStep} ${s.optionActive}` : `${s.lineStep} ${s.optionInactive}`}></div>
      </div>
      <div>
        <div className={stepForm > 0 ? `${s.circleStep} ${s.optionActive}` : `${s.circleStep} ${s.optionInactive}`}>
          <Home />
        </div>
      </div>
    </div>
  );
}
