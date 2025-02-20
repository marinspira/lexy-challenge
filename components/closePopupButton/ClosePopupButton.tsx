import { Typography } from "@mui/material"
import styles from './ClosePopupButton.module.css'

interface ClosePopupButtonProps {
    handleClosePopup: () => void
}

const ClosePopupButton: React.FC<ClosePopupButtonProps> = ({ handleClosePopup }) => {
    return <Typography className={styles["close-button"]} onClick={handleClosePopup}>x</Typography>
}

export default ClosePopupButton