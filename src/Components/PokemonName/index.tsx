import { IBaseData } from "models";
import React, { memo, useCallback } from "react";
import styles from "./index.module.scss";

interface IPokemonName {
  data: IBaseData;
  index: number;
  onClick: (url: string) => void;
}

const PokemonName = ({ data, index, onClick }: IPokemonName) => {
  const handleClick = useCallback(() => {
    onClick(data.url);
  }, [data.url, onClick]);
  return (
    <li className={styles.container} onClick={handleClick}>
      <div className={styles.count}>{String(index).padStart(3, "0")}</div>
      <div className={styles.name}>{data.name}</div>
    </li>
  );
};

export default memo(PokemonName);
