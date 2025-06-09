import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const Graphic = () => {
    const data = {
        labels: [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez"
        ],
        datasets: [
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                ],
                color: (opacity = 1) => `rgba(14, 126, 88, ${opacity})`, // cor do gráfico
                strokeWidth: 2 // largura da linha do gráfico
            }
        ],
        legend: ["Ganhos 2025"]
    };
    const config = {
        backgroundColor: "#1cc910",
        backgroundGradientFrom: "#eff3ff",
        backgroundGradientTo: "#efefef",
        decimalPlaces: 2, // número de casas decimais
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "4"
        },
        barPercentage: 1
    };
    const screenWidth = Dimensions.get("window").width;
    return (
        <View>
            <LineChart
                data={data}
                width={screenWidth - 48}
                height={220}
                yAxisLabel="R$ "
                chartConfig={config}
                bezier
                style={{
                    padding: 24,
                    borderRadius: 16
                }}
            />
        </View>
    );
};
export default Graphic;
