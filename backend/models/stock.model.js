import mongoose from "mongoose";
import brain from "brain.js";

const stockSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    historical_prices: [
        {
            date: { type: Date, required: true },
            open: { type: Number, required: true },
            high: { type: Number, required: true },
            low: { type: Number, required: true },
            close: { type: Number, required: true },
            volume: { type: Number, required: true },
        },
    ],
    market_cap: { type: Number, required: true },
});

stockSchema.statics.trainModel = async function (symbol) {
    const stock = await this.findOne({ symbol });
    if (!stock) throw new Error("Stock not found");

    // Prepare training data as an array of sequences
    const trainingData = [
        stock.historical_prices.map((price) => [
            price.open,
            price.high,
            price.low,
            price.volume,
        ]),
    ];

    const net = new brain.recurrent.LSTMTimeStep();
    net.train(trainingData, {
        iterations: 100,
        errorThresh: 0.005,
    });

    return net.toJSON(); // Returns JSON format of the trained model
};

stockSchema.statics.predict = function (trainedModel, inputData) {
    const net = new brain.recurrent.LSTMTimeStep();
    net.fromJSON(trainedModel);

    try {
        const result = net.run(inputData);

        // Assuming the result is an array and the first element is the predicted change
        const predictedChange = result[0]; // Predicted change value

        // Here you would typically need access to the last closing price
        // You'll need to pass this in or retrieve it in a way appropriate for your application
        const lastClosingPrice = inputData[inputData.length - 1][0]; // Assuming the last input feature array has closing price as the 4th element

        // Calculate the predicted price using the formula
        const predictedPrice = lastClosingPrice + (lastClosingPrice * predictedChange); // Apply the formula

        return { success: true, predictedPrice: predictedPrice}; // Format to two decimal places
    } catch (error) {
        console.error("Prediction Error:", error);
        return { success: false, error: error.message };
    }
};

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
