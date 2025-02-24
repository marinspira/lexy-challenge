import { useEffect, useState } from "react";
import { Card, TextField, Button, Avatar, Box, Modal, Typography, IconButton, FormControlLabel, Radio, RadioGroup, FormLabel } from "@mui/material";
import styles from "./AccountCard.module.css";
import NewProfileModal from "../newProfileModal/NewProfileModal";

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
  onProfileClick: (profile: IProfile) => void;
  setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountCard: React.FC<IAccountCard> = ({
  profiles,
  editable,
  onProfileClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allProfiles, setAllProfiles] = useState<IProfile[]>([]);

  useEffect(() => {
    setAllProfiles(profiles);
  }, [profiles]);

  return (
    <Card>
      <div className={styles["card"]}>
        {allProfiles.map((profile) => (
          <Button key={profile.id} onClick={() => onProfileClick(profile)}>
            <Avatar alt={profile.username} src={profile.avatar} />
            {profile.username}
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

      {isModalOpen &&
        <NewProfileModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          allProfiles={allProfiles}
          setAllProfiles={setAllProfiles}
        />
      }
    </Card>
  );
};

export default AccountCard;
