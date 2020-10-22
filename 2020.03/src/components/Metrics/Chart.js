export class Chart {
	constructor(props, select_metrics) {
		this.props = props;
		this.select_metrics;
		this.options;
		this.charts_obj;
	}

	// Get data for one select metrics
	_getChartsData() {
		let charts_data = JSON.parse(JSON.stringify(this.props));
		let charts_obj = {};

		for (let i = 0; i < charts_data.length; i++) {
			for (let key in charts_data[i]) {
				if (key !== 'day' && key !== this.select_metrics) {
					delete charts_data[i][key];
				} else {
					charts_obj[charts_data[i]['day']] = charts_data[i][this.select_metrics]
				}
			}
		}
		return charts_obj;
	}

	// Get options for select
	_getOptions() {
		return Object.keys(this.props[0]).filter(item => item !== 'day').map(i => {
			if (i === this.select_metrics) return `<option selected>${i}</option>`;
			return `<option>${i}</option>`;
		}).join('');
	}

	// Create and show canvas
	_createCanvas() {
		const canvas = document.getElementById('chart_canvas');
		canvas.width = '1050';
		canvas.height = '500'
		canvas.style.display = 'block';
		return canvas;
	}

	_draw(obj) {
		function drawLine(ctx, startX, startY, endX, endY, color) {
			ctx.save();
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo(startX, startY);
			ctx.lineTo(endX, endY);
			ctx.stroke();
			ctx.restore();
		}

		function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
			ctx.save();
			ctx.fillStyle = color;
			ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
			ctx.restore();
		}

		function drawText(ctx, text, x, y) {
			ctx.save();
			ctx.fillStyle = '#333';
			ctx.font = "bold 11px Arial";
			ctx.fillText(text, x, y);
			ctx.restore();
		}

		const Barchart = function (options) {
			this.options = options;
			this.canvas = options.canvas;
			this.ctx = this.canvas.getContext("2d");
			this.colors = options.colors;
			this.max = options.max;

			this.drawChart = function () {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

				if (this.max == 0) {
					drawLine(
						this.ctx,
						0,
						this.canvas.height - 10,
						this.canvas.width,
						this.canvas.height - 10,
						this.options.gridColor
					);
					drawText(this.ctx, 0, 5, this.canvas.height);
					return false;
				}

				let canvasActualHeight = this.canvas.height - this.options.padding * 2;
				let canvasActualWidth = this.canvas.width - this.options.padding - 140;

				// Drawing bars
				let barIndex = 0;
				let numberOfBars = Object.keys(this.options.data).length;
				let barSize = numberOfBars < 15 ? 20 : (canvasActualWidth) / numberOfBars;

				for (let categ in this.options.data) {
					let val = this.options.data[categ];
					let barHeight = Math.round(canvasActualHeight * val / this.max);

					drawBar(
						this.ctx,
						this.options.padding + 100 + barIndex * barSize,
						this.canvas.height - barHeight - this.options.padding,
						barSize,
						barHeight,
						this.colors[barIndex % this.colors.length]
					);

					// Writing dates
					if (numberOfBars < 40) {
						if (barIndex % 4 === 0) {
							drawText(this.ctx, categ, this.options.padding + 80 + barIndex * barSize, this.canvas.height);
						}
					} else if (numberOfBars < 70 && numberOfBars > 40) {
						if (barIndex % 6 === 0) {
							drawText(this.ctx, categ, this.options.padding + 80 + barIndex * barSize, this.canvas.height);
						}
					} else if (numberOfBars < 110 && numberOfBars > 70) {
						if (barIndex % 10 === 0) {
							drawText(this.ctx, categ, this.options.padding + 80 + barIndex * barSize, this.canvas.height);
						}
					} else {
						if (barIndex % 30 === 0) {
							drawText(this.ctx, categ, this.options.padding + 80 + barIndex * barSize, this.canvas.height);
						}
					}
					barIndex++;
				}

				// Drawing the grid lines
				let gridValue = 0;
				while (gridValue <= this.max) {
					let gridY = canvasActualHeight * (1 - gridValue / this.max) + this.options.padding;
					drawLine(
						this.ctx,
						0,
						gridY,
						this.canvas.width,
						gridY,
						this.options.gridColor
					);

					// Writing grid markers
					if (gridValue > 1) {
						gridValue = Math.round((gridValue) * 10) / 10;
					} else {
						gridValue = Math.round((gridValue) * 10000) / 10000;
					}
					drawText(this.ctx, gridValue, 5, gridY + 10);

					gridValue = gridValue + this.options.gridScale;
				}
			}
		}

		return new Barchart(obj);
	}

	// Init events
	events(rerender) {
		document.addEventListener('DOMContentLoaded', () => {
			document.addEventListener('change', (e) => {
				if (e.target && e.target.id === 'select') {
					rerender(e.target.value);
				}
			});
		});
	}

	render(select_metrics = 'clicks') {
		this.select_metrics = select_metrics;
		this.options = this._getOptions();
		this.charts_obj = this._getChartsData();
		let max = 0;

		for (let item in this.charts_obj) {
			max = Math.max(max, this.charts_obj[item]);
		}

		const myBarchart = this._draw(
			{
				canvas: this._createCanvas(),
				padding: 10,
				gridScale: max / 10,
				gridColor: "#333",
				data: this.charts_obj,
				max: max,
				colors: ["#378fc0", "#41b3f3"]
			}
		);
		myBarchart.drawChart();

		const tpl = `<div class="form">
                  <div class="form_container">
                      <div class="form_row">
                          <div class="form_label">Chart metric</div>
                          <select id="select" class="form_select">
                              ${this.options}
                          </select>
                      </div>
                  </div>
              </div>
              <div id="chart-container" class="chart_container"></div>`;

		return tpl;
	}
}
