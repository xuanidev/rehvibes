import Select from 'react-select';

const options = [
  { value: '8f3c45f9-a41d-40c6-8c2b-178c215cd176', label: 'Cuello' },
  { value: '8f3c45f9-a41d-40c6-8c2b-178c215cd1762', label: 'Espalda' },
];
const customStyles = {
  option: (defaultStyles: any, state: any) => ({
    // You can log the defaultStyles and state for inspection
    // You don't need to spread the defaultStyles
    ...defaultStyles,
    color: state.isSelected ? '#212529' : '#000',
    backgroundColor: state.isSelected ? '#ff662e' : 'transparent',
    border: '1px solid white',
    padding: '6px 10px',
  }),

  control: (defaultStyles: any) => ({
    ...defaultStyles,
    'backgroundColor': 'transparent',
    'padding': '0 10px',
    'fontSize': '14px',
    'border': '1px solid white',
    'borderRadius': '8px',
    'boxShadow': 'none',
    'color': 'black',
    '&:hover': {
      border: '1px solid white',
    },
  }),
  singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: '#fff' }),
};
interface SelectComponentProps {
  selectedOption: { value: string; label: string } | null;
  setSelectedOption: (selectedOption: { value: string; label: string } | null) => void;
  style?: string;
}
export const SelectComponent = (props: SelectComponentProps) => {
  const { selectedOption, setSelectedOption, style } = props;
  return (
    <div className={style}>
      <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options} styles={customStyles} />
    </div>
  );
};
export default SelectComponent;
