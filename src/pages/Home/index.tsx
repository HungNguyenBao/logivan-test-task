import useAppDispatch from "hooks/useAppDispatch";
import React, { memo, useCallback, useEffect, useState } from "react";
import { getPokemonData } from "reducers/PokemonReducer";
import styles from "./index.module.scss";
import useAppSelector from "hooks/useAppSelector";
import { IBaseData, IPokemonDetail } from "models";
import PokemonName from "Components/PokemonName";
import api from "api";

const Home = () => {
  const dispatch = useAppDispatch();
  const [pokemonDetail, setPokemonDetail] = useState<
    IPokemonDetail | null | undefined
  >(null);
  const pokemonList = useAppSelector((state) => state.pokemon.data?.results);
  const onPokemonClick = useCallback(async (url: string) => {
    // TODO: handle error if failed
    setPokemonDetail(null);
    const pokemonDetailRes = await api.pokemon.detail(url);
    setPokemonDetail(pokemonDetailRes.data);
  }, []);
  const renderPokemonList = useCallback(
    (item: IBaseData, index: number) => {
      return (
        <PokemonName
          data={item}
          index={index}
          key={item.name}
          onClick={onPokemonClick}
        />
      );
    },
    [onPokemonClick]
  );
  useEffect(() => {
    dispatch(getPokemonData());
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <div className={styles["left-side"]}>
        <div className={styles["page-title"]}>Pokemon Detail</div>
        {pokemonDetail && (
          <>
            <div className={styles["base-info-wrap"]}>
              <div className={styles.avatar}>
                <img
                  src={
                    pokemonDetail.sprites.other["official-artwork"]
                      .front_default
                  }
                  alt="pokemon-avatar"
                />
              </div>
              <div className={styles["base-info"]}>
                <span className={styles["session-title"]}>Pokédex data</span>
                <table className="vitals-table">
                  <tbody>
                    <tr>
                      <th>National №</th>
                      <td>{String(pokemonDetail.id).padStart(3, "0")}</td>
                    </tr>
                    <tr>
                      <th>Type</th>
                      <td>
                        {pokemonDetail.types.map((type) => (
                          <div
                            className={styles["type-item"]}
                            key={type.type.name}
                          >
                            {type.type.name}
                          </div>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <th>Height</th>
                      <td>{pokemonDetail.height}</td>
                    </tr>
                    <tr>
                      <th>Weight</th>
                      <td>{pokemonDetail.weight}</td>
                    </tr>
                    <tr>
                      <th>Abilities</th>
                      <td>
                        {pokemonDetail.abilities.map((ability) => (
                          <div>
                            {ability.ability.name}
                            {`${ability.is_hidden ? " (hidden ability)" : ""}`}
                          </div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <span className={styles["session-title"]}>Base stats</span>
                <table className="vitals-table">
                  <tbody>
                    {pokemonDetail.stats.map((stat) => (
                      <tr key={stat.stat.name}>
                        <th>{stat.stat.name}</th>
                        <td>{stat.base_stat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles["right-side"]}>
        <div className={styles["page-title"]}>Pokemon List</div>
        <ul className={styles["poke-list"]}>
          {pokemonList?.map(renderPokemonList)}
        </ul>
      </div>
    </div>
  );
};

export default memo(Home);
