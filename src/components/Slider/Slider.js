import React from "react";
import "./slider.css";
import {ReactComponent as RightSliderIcon} from "../../assets/right-slider-button.svg";
import {ReactComponent as LeftSliderIcon} from "../../assets/left-slider-button.svg";


class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImg: ""
        }
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(action) {
        const { images } = this.props;
        const productLength = images.length;
        const productIndex = images.indexOf(this.state.currentImg);

        switch(action) {
            case "next":
                this.setState({
                    currentImg: images[(productIndex < (productLength-1)) ? (productIndex+1) : 0]
                })
                break
            case "previous":
                this.setState({
                    currentImg: images[(productIndex < 1) ? (productLength-1) : (productIndex-1)]
                }) 
                break
            default:
                return
        }
    }

    componentDidMount() {
        const { images } = this.props;

        this.setState({
            currentImg: images[0]
        })
    }

    render() {
        const { currentImg } = this.state;
        const { images } = this.props;
        const productLength = images.length;

        return (
            <div className="slider-container">
                <img className="slider-product" src={currentImg}></img>
                { (window.location.pathname === "/cart" && productLength > 1) 
                    &&  <div className="slider_actions">
                        <LeftSliderIcon onClick={() => this.handleOnClick("previous")} />
                        <RightSliderIcon onClick={() => this.handleOnClick("next")} />
                        </div> 
                }
            </div>
        )
    }
}

export { Slider }