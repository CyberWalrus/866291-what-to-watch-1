import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withPlayCard from "./with-play-card.js.js";
import PropTypes from "prop-types";

Enzyme.configure({adapter: new Adapter()});

class MockTestComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className={`test`} onMouseEnter={this.props.onMouseEnter} />
      </div>
    );
  }
}
MockTestComponent.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  srcPreviewImage: PropTypes.string.isRequired,
  genre: PropTypes.oneOf([
    `comedy`,
    `crime`,
    `documentary`,
    `drama`,
    `horror`,
    `family`,
    `romance`,
    `sci-fi`,
    `thriller`
  ]).isRequired,
  preview: PropTypes.string.isRequired,
  isPlay: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func,
  onCardMouseOver: PropTypes.func,
  onCardMouseLeave: PropTypes.func
};

const MockComponentWrapped = withPlayCard(MockTestComponent);

describe(`<MockComponentWrapped />`, () => {
  const handleClick = jest.fn();
  it(`test opening film card`, () => {
    const app = shallow(
        <MockComponentWrapped
          id={1}
          genre="comedy"
          title="What We Do in the Shadows"
          srcPreviewImage="img/what-we-do-in-the-shadows.jpg"
          preview="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4"
          onMouseEnter={handleClick}
        />
    );

    expect(app.state().isPlay).toEqual(false);
  });
});
