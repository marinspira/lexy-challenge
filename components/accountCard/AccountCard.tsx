import { useEffect, useState } from "react";
import { Card, TextField, Button, Avatar, Box, Modal, Typography, IconButton, FormControlLabel, Radio, RadioGroup, FormLabel } from "@mui/material";
import styles from "./AccountCard.module.css";

type IPlatform = "facebook" | "instagram" | "linkedin";

interface ITaste {
  title: string;
  elements: string[];
}

interface IProfile {
  id: string;
  avatar: string;
  platform: IPlatform;
  username: string;
  tastes: ITaste[];
}

export interface IAccountCard {
  profiles: IProfile[];
  id: string;
  editable?: boolean;
  setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountCard: React.FC<IAccountCard> = ({
  profiles,
  editable,
  id,
  setIsProfileModalOpen,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allProfiles, setAllProfiles] = useState<IProfile[]>([]);

  const [newProfile, setNewProfile] = useState<IProfile>({
    id: "",
    avatar: "",
    platform: "facebook",
    username: "",
    tastes: [{ title: "", elements: [""] }],
  });

  useEffect(() => {
    setAllProfiles(profiles);
  }, [profiles]);

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
    <Card>
      <div className={styles["card"]}>
        {allProfiles.map((item, index) => (
          <Button key={index} onClick={() => setIsProfileModalOpen(true)}>
            <Avatar alt={item.username} src={item.avatar} />
            {item.username}
          </Button>
        ))}
        {editable && (
          <div>
            <Button onClick={() => setIsModalOpen(true)}>Add</Button>
          </div>
        )}
        {!editable && (
          <div className={styles["empty-accounts"]}>
            <Button onClick={() => setIsModalOpen(true)}>
              <span className={styles["link"]}>Add a new Profile</span>
            </Button>
          </div>
        )}
      </div>

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
    </Card>
  );
};

export default AccountCard;
