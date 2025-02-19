import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import styles from './Square.module.css'
import CloseIcon from "@/components/buttons/icons/CloseIcon";

type Colors = 'primary' | 'secondary' | 'success'

interface SquareProps {
    color: Colors
}

const Square: React.FC<SquareProps> = ({ color }) => {
    return (
        <div className={styles["interview-box-container"]}>
            <Box
                sx={{
                    width: 300,
                    height: 300,
                    backgroundColor: `${color}.dark`,
                    "&:hover": {
                        backgroundColor: `${color}.main`,
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            />
            <Button variant="contained" startIcon={<CloseIcon />}>
                Delete
            </Button>
        </div>
    )
}

export default Square;