import React from "react";
import './button.css'

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.getStyle = this.getStyle.bind(this);
        this.getSize = this.getSize.bind(this);
        this.getColor = this.getColor.bind(this);
        this.getAction = this.getAction.bind(this);
    }

    render() {
        const { size, color, disabled, action } = this.props;

        return (
            <button style={this.getStyle(size, color)} disabled={disabled} onClick={() => this.getAction(action)}>
                {this.props.children}
            </button>
        )
    }

    getStyle = (size, color) => {
        let selectedSize = this.getSize(size);
        let selectedColor = this.getColor(color);

        return {
            ...selectedSize,
            ...selectedColor
        }
    }

    getSize = (size) => {
        size.toLowerCase();

        switch (size) {
            case "large":
                return {
                    'width': '15rem',
                    'height': '3rem',
                    'color': '#ffffff',
                    'fontSize': 'medium'
                };
            case "medium":
                return {
                    'width': '9rem',
                    'height': '2.5rem',
                    'fontSize': 'small'
                };
            case "small":
                return {
                    'width': '1.5rem',
                    'height': '1.5rem',
                    'fontSize': 'small'
                };
            default:
                return;
        }
    }

    getColor = (color) => {
        color.toLowerCase();

        switch (color) {
            case "green":
                return {
                    'background': '#5ECE7B',
                    'color': '#FFFFFF'
                };
            case "white":
                return {
                    'background': '#FFFFFF',
                    'color': '#000000',
                    'border': '1px solid #000000'
                    };
            case "gray":
                return {
                    'background': '#a2a6ab',
                    'color': '#000000'
                };
            default:
                return;
        }
    }

    getAction = (type) => {
        type.toLowerCase();

        switch(type) {
            case 'add':
                console.log('comprar')
                break
            case 'remove':
                console.log('remover')
                break
            case 'bag':
                console.log('ver compra')
                break
            default:
                console.log('invalid option')
                break
        }
    }
}

export { Button }