import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import styles from './Square.module.css';
import CloseIcon from "@/components/buttons/icons/CloseIcon";

type Colors = 'primary' | 'secondary' | 'success';

interface SquareProps {
    color: Colors;
}

const Square: React.FC<SquareProps> = ({ color }) => {
    const [deleted, setDeleted] = useState(false);

    function handleSquareVisibility() {
        setDeleted(!deleted);
    }

    return (
        <div>
            {deleted ? (
                <div className={styles["interview-button-container"]}>
                    <Button onClick={handleSquareVisibility} variant="contained">
                        Reappear
                    </Button>
                </div>
            ) : (
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
                    <Button onClick={handleSquareVisibility} variant="contained" startIcon={<CloseIcon />}>
                        Delete
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Square;