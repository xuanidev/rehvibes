import { CalculateDecrementPercentageProps, CalculatePercentageProps, CheckPercentageProps, Program, SurveyData, prevStepProps} from "../models";
import { desire } from "../optionsData";

export const preloadImage = (url: string) => {
    return new Promise((resolve, reject) => {
        if (url) {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = reject;
        }
    });
};

export const checkPercentage = (props: CheckPercentageProps) => {
    const { percentage, setPercentage, numSteps, setNumSteps } = props;
    const numStepsLocal = localStorage.getItem('numSteps');
    const percentageLocal = localStorage.getItem('percentage');
    if (!percentageLocal) {
        localStorage.setItem('percentage', JSON.stringify(percentage));
    } else {
        setPercentage(JSON.parse(percentageLocal));
    }
    if (!numStepsLocal) {
        localStorage.setItem('numSteps', JSON.stringify(numSteps));
    } else {
        setNumSteps(JSON.parse(numStepsLocal));
    }
};

export const calculatePercentage = (props: CalculatePercentageProps) => {
    const { data, numSteps, setNumSteps, currentStep, setPercentage, percentage } = props;
    if (data.desire && numSteps[1] === 0) {
        const auxSteps = data.desire === desire.conditionOption ? 3 : 6;
        setNumSteps(prevState => {
        const updatedNumSteps = [...prevState];
        updatedNumSteps[1] = auxSteps;
        localStorage.setItem('numSteps', JSON.stringify(updatedNumSteps));
        return updatedNumSteps;
        });
    }

    if (currentStep > numSteps[0] && currentStep < numSteps[0] + numSteps[1]) {
        setPercentage(prevState => {
        const updatedPercentage = [...prevState];
        updatedPercentage[1] = ((currentStep - numSteps[0] + 1) / numSteps[1]) * 100;
        localStorage.setItem('percentage', JSON.stringify(updatedPercentage));
        return updatedPercentage;
        });
    } else {
        if (currentStep < 6) {
        setPercentage(prevState => {
            const updatedPercentage = [...prevState];
            updatedPercentage[0] = ((currentStep + 1) / numSteps[0]) * 100;
            localStorage.setItem('percentage', JSON.stringify(updatedPercentage));
            return updatedPercentage;
        });
        } else {
        if (percentage[1] !== 100) {
            setPercentage(prevState => {
            const updatedPercentage = [...prevState];
            updatedPercentage[1] = 100;
            localStorage.setItem('percentage', JSON.stringify(updatedPercentage));
            return updatedPercentage;
            });
        }
        if (currentStep === numSteps[0] + numSteps[1] + numSteps[2] - 2) {
            setPercentage([100, 100, 100]);
            return;
        }
        setPercentage(prevState => {
            const updatedPercentage = [...prevState];
            updatedPercentage[2] = ((currentStep - numSteps[0] - numSteps[1] + 1) / numSteps[2]) * 100;
            console.log(numSteps[0] + numSteps[1] + numSteps[2]);
            localStorage.setItem('percentage', JSON.stringify(updatedPercentage));
            return updatedPercentage;
        });
        }
    }
};

export const calculateDecrementPercentage = (props: CalculateDecrementPercentageProps) => {
    const { currentStep, numSteps, setPercentage, data } = props;
    if (currentStep < numSteps[0]) {
      setPercentage(prevState => {
        const updatedPercentage = [...prevState];
        const nextValue = currentStep !== 0 ? currentStep - 1 : 0;
        updatedPercentage[0] = (nextValue / numSteps[0]) * 100;
        localStorage.setItem('percentage', JSON.stringify(updatedPercentage));
        return updatedPercentage;
      });
    } else if (data.desire && currentStep < numSteps[0] + numSteps[1]) {
      setPercentage(prevState => {
        const updatedPercentage = [...prevState];
        updatedPercentage[1] = ((currentStep - numSteps[0] - 1) / numSteps[1]) * 100;
        localStorage.setItem('percentage', JSON.stringify(updatedPercentage));
        return updatedPercentage;
      });
    } else {
      setPercentage(prevState => {
        const updatedPercentage = [...prevState];
        updatedPercentage[2] = ((currentStep - numSteps[0] - numSteps[1] - 1) / numSteps[2]) * 100;
        console.log(numSteps[0] + numSteps[1] + numSteps[2]);
        localStorage.setItem('percentage', JSON.stringify(updatedPercentage));
        return updatedPercentage;
      });
    }
  };

/*export const generateProgram = (data:SurveyData, ):Program =>{

}*/