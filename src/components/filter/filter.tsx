import * as React from "react";
import {ReactElement, FunctionComponent} from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/filter/filter";
import {getGeners} from "../../store/data/selectors";
import {getGenreSelected} from "../../store/filter/selectors";
import {StateApp, ThunkDispatch} from "../../type/reducer";

interface PropsState {
  genreSelected: string;
  genres: string[];
}
interface PropsDispatch {
  onChangeFilter: (value: string) => void;
}
type Props = PropsState & PropsDispatch;

const Filter: FunctionComponent<Props> = ({
  genres,
  genreSelected,
  onChangeFilter
}: Props): ReactElement => {
  return (
    <ul className="catalog__genres-list">
      {genres &&
        genres.map(
          (item, i): ReactElement => (
            <li
              key={i}
              className={
                genreSelected === item
                  ? `catalog__genres-item catalog__genres-item--active`
                  : `catalog__genres-item`
              }
            >
              <a
                className="catalog__genres-link"
                onClick={(): void => onChangeFilter(item)}
              >
                {item}
              </a>
            </li>
          )
        )}
    </ul>
  );
};

const mapStateToProps = (state: StateApp, ownProps: Props): Props =>
  Object.assign({}, ownProps, {
    genres: getGeners(state),
    genreSelected: getGenreSelected(state)
  });
const mapDispatchToProps = (dispatch: ThunkDispatch): PropsDispatch => ({
  onChangeFilter: (value: string): void => {
    dispatch(ActionCreator.changeGenre(value));
  }
});

export {Filter};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
