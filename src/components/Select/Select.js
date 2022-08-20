import React from "react";
import "./select.css"

class Select extends React.Component {
    render() {
        const { type, attribute, selectedProducts, onChange } = this.props;

        return (
            <div className="select">
                <label><b>{attribute.id}</b></label>
                <div className="select_attributes">
                    {attribute.items.map(item => {
                        if(type === "swatch") {
                            return (
                                <div
                                style={{'background': item.value}}
                                className="select_swatch"
                                onClick={() => {onChange && onChange({...selectedProducts, [attribute.name]: item.value})}} />
                            )
                        } else {
                            return (
                                <div
                                className="select_non-swatch"
                                onClick={() => {onChange && onChange({...selectedProducts, [attribute.name]: item.value})}} >
                                    <p>{item.value}</p>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        )   
    }
}

export { Select }