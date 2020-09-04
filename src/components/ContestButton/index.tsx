import React from "react";
import { Data } from "../Interface";
import { titleCase } from "../Utils";
import { useSelector } from "react-redux";
import {
  Container,
  ContestIcon,
  Contest,
} from "./ContestButton";

export interface Props {
  contestName: string;
  size: number;
}

const ContestButton: React.FC<Props> = ({ contestName, size }) => {
  const dataAuth = useSelector((state: Data) => state.data.auth);
  const userScore = useSelector((state: Data) => state.data.userScore);
  const challengeList = useSelector((state: Data) => state.data.challengeList);
  const selectedChallengeName = useSelector(
    (state: Data) => state.data.selectedChallenge.name
  );

  return (
    <Container
      className={
        selectedChallengeName &&
        contestName.split("/")[0].toUpperCase() ===
          selectedChallengeName.split("/")[0].split(" ").join("_").toUpperCase()
          ? "active"
          : ""
      }
    >
      <Contest>
        <div>
          <ContestIcon />
          {contestName ? (
            <span>{titleCase(contestName.split("/")[0])}</span>
          ) : (
            <></>
          )}
        </div>
        {challengeList && dataAuth.authenticated ? (
          userScore ? (
            <span>
              {
                challengeList.filter((element) => {
                  return element.contestId === contestName;
                }).length
              }
              /{size}
            </span>
          ) : (
            <span>0/{size}</span>
          )
        ) : (
          <></>
        )}
      </Contest>
    </Container>
  );
};

export default ContestButton;
