import * as React from "react";
import {Fragment, ReactElement, FunctionComponent} from "react";

interface Props {
  runTime: string;
  genre: string;
  released: number;
  director: string;
  starrings: string[];
}

const FilmDetails: FunctionComponent<Props> = ({
  runTime,
  genre,
  released,
  director,
  starrings
}: Props): ReactElement => {
  return (
    <Fragment>
      <div className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{director}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value">
              {starrings.map(
                (item, index): ReactElement => (
                  <Fragment key={index}>
                    {item}
                    <br />
                  </Fragment>
                )
              )}
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">{runTime}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{released}</span>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default FilmDetails;
