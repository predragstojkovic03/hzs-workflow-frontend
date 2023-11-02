import styles from './Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  styleType?: string;
  children: React.ReactNode;
  onClick?: (e: any) => any;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button = ({
  type,
  styleType = 'red',
  children,
  onClick,
  disabled,
  fullWidth,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${disabled ? styles.disabled : ''} ${
        styleType === 'secondary' ? styles.secondary : ''
      } ${fullWidth && styles.fullWidth}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
