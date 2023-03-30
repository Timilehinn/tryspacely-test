import { useState } from "react";

const useRandomColor = () => {
    let colors = [];
    const generateColor = () => {
        let randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
        colors = [...colors, randomColor];
    }
    let end = 4
    while (colors.length < end) {
        generateColor();
    }
    return colors;
}

export default useRandomColor;