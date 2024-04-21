export interface InputProps {
    name: string;
    label: string;
    type: string;
    value: string;
    setValue: (value: string) => void;
}

export interface CTAProps {
    text: string;
    action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

