import React from "react";
import "./slider.css";
import { ReactComponent as RightSliderIcon } from "../../assets/right-slider-button.svg";
import { ReactComponent as LeftSliderIcon } from "../../assets/left-slider-button.svg";
import { getPathname } from "../../utils/utils";
import { getAllImages } from "../../queries/getAllData";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allImg: [],
      currentImg: "",
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(action) {
    const { allImg } = this.state;
    const productLength = allImg.length;
    const productIndex = allImg.indexOf(this.state.currentImg);

    switch (action) {
      case "next":
        this.setState({
          currentImg:
            allImg[productIndex < productLength - 1 ? productIndex + 1 : 0],
        });
        break;
      case "previous":
        this.setState({
          currentImg:
            allImg[productIndex < 1 ? productLength - 1 : productIndex - 1],
        });
        break;
      default:
        return;
    }
  }

  componentDidMount() {
    const { imageId } = this.props;

    getAllImages(imageId).then((res) => {
      this.setState({
        allImg: res.product.gallery,
        currentImg: res.product.gallery[0],
      });
    });
  }

  render() {
    const { currentImg } = this.state;
    const { imageId } = this.props;
    const productLength = imageId.length;

    return (
      <div className="slider_container">
        <img className="slider_product" src={currentImg} alt="product-img" />
        {getPathname("cart") && productLength > 1 && (
          <div className="slider_actions">
            <LeftSliderIcon onClick={() => this.handleOnClick("previous")} />
            <RightSliderIcon onClick={() => this.handleOnClick("next")} />
          </div>
        )}
      </div>
    );
  }
}

export { Slider };
