import React, { useState } from "react";
import { TextField, Button, Box, Modal, Typography, IconButton, FormControlLabel, Radio, RadioGroup, FormLabel } from "@mui/material";
import ClosePopupButton from "../closePopupButton/ClosePopupButton";

type IPlatform = "facebook" | "instagram" | "linkedin";

interface IProfile {
    tastes: ITaste[];
    [key: string]: any;
}

interface ITaste {
    title: string;
    elements: string[];
}

interface NewProfileModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAllProfiles: any;
    allProfiles: any;
}

const NewProfileModal: React.FC<NewProfileModalProps> = ({ isModalOpen, setIsModalOpen, allProfiles, setAllProfiles }) => {

    const [newProfile, setNewProfile] = useState<IProfile>({
        id: "",
        avatar: "",
        platform: "facebook",
        username: "",
        tastes: [{ title: "", elements: [""] }],
    });

    const handleInputChange = (field: keyof IProfile, value: string) => {
        setNewProfile({ ...newProfile, [field]: value });
    };

    const handleTasteChange = (index: number, field: keyof ITaste, value: string) => {
        const updatedTastes = [...newProfile.tastes];
        updatedTastes[index] = { ...updatedTastes[index], [field]: value };
        setNewProfile({ ...newProfile, tastes: updatedTastes });
    };

    const handleElementChange = (tasteIndex: number, elementIndex: number, value: string) => {
        const updatedTastes = [...newProfile.tastes];
        updatedTastes[tasteIndex].elements[elementIndex] = value;
        setNewProfile({ ...newProfile, tastes: updatedTastes });
    };

    const addTaste = () => {
        setNewProfile({
            ...newProfile,
            tastes: [...newProfile.tastes, { title: "", elements: [""] }],
        });
    };

    const removeTaste = (index: number) => {
        const updatedTastes = newProfile.tastes.filter((_, i) => i !== index);
        setNewProfile({ ...newProfile, tastes: updatedTastes });
    };

    const addElement = (tasteIndex: number) => {
        const updatedTastes = [...newProfile.tastes];
        updatedTastes[tasteIndex].elements.push("");
        setNewProfile({ ...newProfile, tastes: updatedTastes });
    };

    const removeElement = (tasteIndex: number, elementIndex: number) => {
        const updatedTastes = [...newProfile.tastes];
        updatedTastes[tasteIndex].elements.splice(elementIndex, 1);
        setNewProfile({ ...newProfile, tastes: updatedTastes });
    };

    const handleAddProfile = () => {
        if (!newProfile.username.trim()) return;
        setAllProfiles([...allProfiles, { ...newProfile, id: Date.now().toString() }]);
        setIsModalOpen(false);
        setNewProfile({
            id: "",
            avatar: "",
            platform: "facebook",
            username: "",
            tastes: [{ title: "", elements: [""] }],
        });
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    overflow: "auto",
                    maxHeight: '90vh'
                }}
            >
                <ClosePopupButton handleClosePopup={() => setIsModalOpen(false)} />
                <Typography id="modal-title" variant="h6" component="h2">
                    Add New Profile
                </Typography>
                <TextField
                    label="Username"
                    fullWidth
                    value={newProfile.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Avatar URL"
                    fullWidth
                    value={newProfile.avatar}
                    onChange={(e) => handleInputChange("avatar", e.target.value)}
                    margin="normal"
                />
                <FormLabel component="legend">Platform</FormLabel>
                <RadioGroup
                    row
                    value={newProfile.platform}
                    onChange={(e) => handleInputChange("platform", e.target.value as IPlatform)}
                >
                    <FormControlLabel value="facebook" control={<Radio />} label="Facebook" />
                    <FormControlLabel value="instagram" control={<Radio />} label="Instagram" />
                    <FormControlLabel value="linkedin" control={<Radio />} label="LinkedIn" />
                </RadioGroup>

                <Typography variant="h6" sx={{ mt: 2 }}>
                    Tastes
                </Typography>
                {newProfile.tastes.map((taste, tasteIndex) => (
                    <Box key={tasteIndex} sx={{ mt: 1, p: 1, border: "1px solid gray", borderRadius: 1 }}>
                        <TextField
                            label="Taste Title"
                            fullWidth
                            value={taste.title}
                            onChange={(e) => handleTasteChange(tasteIndex, "title", e.target.value)}
                            margin="normal"
                        />
                        {taste.elements.map((element, elementIndex) => (
                            <Box key={elementIndex} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <TextField
                                    label={`Element ${elementIndex + 1}`}
                                    fullWidth
                                    value={element}
                                    onChange={(e) => handleElementChange(tasteIndex, elementIndex, e.target.value)}
                                    margin="normal"
                                />
                                <IconButton onClick={() => removeElement(tasteIndex, elementIndex)} color="error">
                                    -
                                </IconButton>
                            </Box>
                        ))}
                        <Button onClick={() => addElement(tasteIndex)}>
                            Add Element
                        </Button>
                        <Button onClick={() => removeTaste(tasteIndex)} color="error">
                            Remove Taste
                        </Button>
                    </Box>
                ))}
                <Button onClick={addTaste} sx={{ mt: 1 }}>
                    Add Taste
                </Button>

                <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleAddProfile}>
                    Save Profile
                </Button>
            </Box>
        </Modal>
    );
};

export default NewProfileModal;