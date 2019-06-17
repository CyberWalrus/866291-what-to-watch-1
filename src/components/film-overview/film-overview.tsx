import * as React from "react";
import {Fragment, ReactElement, FunctionComponent} from "react";

interface Props {
  rating: string;
  ratingLevel: string;
  scoresCount: number;
  description: string;
  director: string;
  starrings: string[];
}

const FilmOverview: FunctionComponent<Props> = ({
  rating,
  ratingLevel,
  scoresCount,
  description,
  director,
  starrings
}: Props): ReactElement => {
  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{ratingLevel}</span>
          <span className="movie-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director">
          <strong>Director: {director}</strong>
        </p>

        <p className="movie-card__starring">
          <strong>
            Starring:
            {starrings.map(
              (item, index): ReactElement => (
                <Fragment key={index}>
                  {index === 0 ? `` : `,`} {item}
                </Fragment>
              )
            )}
          </strong>
        </p>
      </div>
    </Fragment>
  );
};
export default FilmOverview;
