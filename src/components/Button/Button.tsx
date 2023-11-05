import styles from './Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  styleType?: 'primary' | 'purple' | 'secondary';
  children: React.ReactNode;
  onClick?: (e: any) => any;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button = ({
  type,
  styleType = 'primary',
  children,
  onClick,
  disabled,
  fullWidth,
}: ButtonProps) => {
  const getStyleType = (styleType: string) => {
    switch (styleType) {
      case 'primary':
        return '';

      case 'purple':
        return styles.purple;

      case 'secondary':
        return styles.secondary;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${
        disabled ? styles.disabled : ''
      } ${getStyleType(styleType)} ${fullWidth && styles.fullWidth}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
