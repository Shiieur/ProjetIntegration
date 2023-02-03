import './styles.css';

interface IProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  label: string;
}

const SubmitButton = (props: IProps) => {
  return <button type={props.type}>{props.label}</button>;
};

export default SubmitButton;
