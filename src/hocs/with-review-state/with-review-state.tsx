import * as React from "react";
import {PureComponent, ComponentClass, ReactElement} from "react";
import {connect} from "react-redux";
import {compose} from "recompose";
import {getReviewMessage} from "../../store/data/selectors";
import {Operation, ActionCreator} from "../../store/data/data";
import {REVIEW_MESSAGE, TextLength, RatingValue} from "../../constants";
import {Redirect} from "react-router-dom";
import {routeToFilm} from "../../routes";
import {StateApp, ThunkDispatch} from "../../type/reducer";

interface PropsInsert {
  id: number;
}
interface PropsState {
  reviewMessage: string;
}
interface PropsDispatch{
  onSendReview: (rating: string, comment: string, filmId: number) => void;
  onResetReviewMessage: () => void;
}
type Props = PropsInsert & PropsState & PropsDispatch;
interface State {
  ratingSelected: string;
  text: string;
  ratingValid: boolean;
  textValid: boolean;
  formValid: boolean;
  isActive: boolean;
  redirect: boolean;
}

const withReviewState = (Component: any): ComponentClass<Props, State> => {
  class WithReviewState extends PureComponent<Props, State> {
    public constructor(props: Props) {
      super(props);
      this.state = {
        ratingSelected: `0`,
        text: ``,
        ratingValid: false,
        textValid: false,
        formValid: false,
        isActive: true,
        redirect: false
      };
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleUserInput = this.handleUserInput.bind(this);
      this._handleValidateField = this._handleValidateField.bind(this);
      this._handleValidateForm = this._handleValidateForm.bind(this);
    }
    public componentDidUpdate(): void {
      if (this.props.reviewMessage) {
        if (this.props.reviewMessage === REVIEW_MESSAGE) {
          this.setState({
            redirect: true
          });
        } else {
          this.setState({
            isActive: true
          });
        }
        this.props.onResetReviewMessage();
      }
      if (this.state.redirect) {
        this.setState({
          redirect: false
        });
      }
    }
    public handleUserInput(event: React.ChangeEvent<HTMLInputElement>): void {
      const key = event.target.name as keyof State;
      const value = event.target.value as string;
      this.setState<never>({[key]: value}, (): void => {
        this._handleValidateField(key, value);
      });
    }
    public handleFormSubmit(event: React.ChangeEvent<HTMLInputElement>): void {
      const rating = this.state.ratingSelected;
      const comment = this.state.text;
      const filmId = this.props.id;
      event.preventDefault();
      this.setState({
        isActive: false
      });
      this.props.onSendReview(rating, comment, filmId);
    }

    public render(): ReactElement {
      if (this.state.redirect) {
        return <Redirect to={routeToFilm(this.props.id)} />;
      }
      return (
        <Component
          id={this.props.id}
          text={this.state.text}
          isActive={this.state.isActive}
          ratingSelected={this.state.ratingSelected}
          formValid={this.state.formValid}
          onChageUserInput={this.handleUserInput}
          onSubmitSend={this.handleFormSubmit}
        />
      );
    }

    private _handleValidateField(fieldName: keyof State, value: string): void {
      let textValid = this.state.textValid;
      let ratingValid = this.state.ratingValid;
      switch (fieldName) {
        case `text`:
          textValid =
            value.length >= TextLength.MIN && value.length <= TextLength.MAX;
          break;
        case `ratingSelected`:
          ratingValid =
            parseInt(value, 10) >= RatingValue.MIN &&
            parseInt(value, 10) <= RatingValue.MAX;
          break;
        default:
          break;
      }
      this.setState(
        {
          textValid,
          ratingValid
        },
        this._handleValidateForm
      );
    }
    private _handleValidateForm(): void {
      this.setState({
        formValid: this.state.textValid && this.state.ratingValid
      });
    }
  }
  return WithReviewState;
};

const mapStateToProps = (state: StateApp, ownProps: Props): Props =>
  Object.assign({}, ownProps, {
    reviewMessage: getReviewMessage(state)
  });
const mapDispatchToProps = (dispatch: ThunkDispatch): PropsDispatch => ({
  onSendReview: (rating: string, comment: string, filmId: number): Promise<void> =>
    dispatch(Operation.sendReview(rating, comment, filmId)),
  onResetReviewMessage: (): void => {
    dispatch(ActionCreator.resetReviewMessage());
  }
});
export {withReviewState};

export default compose(
  connect<Props, PropsDispatch, {}, StateApp>(
    mapStateToProps,
    mapDispatchToProps
  ),
  withReviewState
);
