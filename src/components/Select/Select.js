import React from "react";

class Select extends React.Component {
    render() {
        const { type, attribute, selectedProducts, onChange } = this.props;

        return (
            <div>
                <label>{attribute.id}</label>
                {attribute.items.map(item => {
                    if(type === "swatch") {
                        return (
                            <input onClick={() => {onChange && onChange({...selectedProducts, [attribute.name]: item.value})}} type="radio" value={item.displayValue} />
                        )
                    } else {
                        return (
                            <option onClick={() => {onChange && onChange({...selectedProducts, [attribute.name]: item.value})}} value={item.displayValue}>
                                {item.value}
                            </option>
                        )
                    }
                })}
            </div>
        )   
    }
}

export { Select }