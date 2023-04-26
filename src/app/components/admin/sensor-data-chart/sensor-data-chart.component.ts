import { Component, OnInit } from '@angular/core';
import { Color, colorSets } from '@swimlane/ngx-charts';
import { AdminServiceService } from 'src/app/services/admin-service.service';

interface ChartItem {
  name: string;
  series: { name: string, value: number }[];
}
@Component({
  selector: 'app-sensor-data-chart',
  templateUrl: './sensor-data-chart.component.html',
  styleUrls: ['./sensor-data-chart.component.scss']
})
export class SensorDataChartComponent implements OnInit {

  tempData=[
     
  {name: '01:00', value: 51.07017543859649},
  {name: '02:00', value: 48.07017543859649},
  {name: '03:00', value: 78.07017543859649},
  {name: '04:00', value: 38.07017543859649},
  {name: '05:00', value: 58.07017543859649},
  {name: '06:00', value: 78.07017543859649},
  {name: '07:00', value: 98.07017543859649},
  {name: '08:00', value: 58.07017543859649},
  {name: '09:00', value: 28.07017543859649},
  {name: '10:00', value: 18.07017543859649},
  {name: '11:00', value: 81.07017543859649},
  {name: '12:00', value: 55.07017543859649},
  {name: '13:00', value: 50.07017543859649},
  {name: '14:00', value: 77.07017543859649},
  {name: '15:00', value: 23.07017543859649},
  {name: '16:00', value: 42.07017543859649},
  {name: '17:00', value: 56.07017543859649},
  {name: '18:00', value: 76.07017543859649},
  {name: '19:00', value: 43.07017543859649},
  {name: '20:00', value: 77.07017543859649},
  {name: '21:00', value: 23.07017543859649},
  {name: '22:00', value: 76.07017543859649},
  {name: '23:00', value: 23.07017543859649},
  {name: '24:00', value: 87.07017543859649}
  

  ]
  chartData:any;
  formattedData:any[]=[]
  view: [number,number] = [800, 400];
  colorScheme = colorSets.find(s => s.name === 'cool')??"";
  xAxisLabel = 'Hour of Day';
  yAxisLabel = 'Total Value';
  gradient = true;

  selectedSensor:any;
  selectedDate:any;
  sensors=[
    {name:"Temperature",value:"dth"},
    {name:"Humidity",value:"dth"},
    {name:"untrasonic",value:"ultra"}
  ]
  constructor(
    private adminService: AdminServiceService,

  ) { }
    data:any;
  ngOnInit(): void {
    
  }

  formatUltraData(){
    Object.keys(this.data).forEach((date) => {
      const chartItem: ChartItem = {
        name: date,
        series: []
      };

      Object.keys(this.data[date]).forEach((hour) => {
        chartItem.series.push({
          name: hour + ':00',
          value: this.data[date][hour]
        });
      });

      this.formattedData.push(chartItem);
    });
  }

  formatTempData(){
    Object.keys(this.data).forEach((date) => {
      const chartItem: ChartItem = {
        name: date,
        series: []
      };

      Object.keys(this.data[date]).forEach((hour) => {
        chartItem.series.push({
          name: hour + ':00',
          value: this.data[date][hour][0]
        });
      });

      this.formattedData.push(chartItem);
    });
  }

  formatHumidityData(){
    Object.keys(this.data).forEach((date) => {
      const chartItem: ChartItem = {
        name: date,
        series: []
      };

      Object.keys(this.data[date]).forEach((hour) => {
        chartItem.series.push({
          name: hour + ':00',
          value: this.data[date][hour][1]
        });
      });

      this.formattedData.push(chartItem);
    });
  }
  onSensorSelect(){
    this.selectedDate=null;
    this.data=null;
    this.formattedData=[];
    this.chartData=null;
    this.adminService.getSensorData(this.selectedSensor.value).subscribe(res=>{
      if(res.success){
        this.data=res.data;
        if(this.selectedSensor.value==="ultra"){
          this.formatUltraData();
        }
        else{
          if(this.selectedSensor.name==="Temperature" && this.selectedSensor.value==="dth"){
            this.formatTempData();
          }
          else{
            this.formatHumidityData();
          }
        }
      }
    })
  }

  onDateSelect(){
    this.chartData=null;
    [this.chartData]=this.formattedData.filter(item=>item.name===this.selectedDate.name)
  }

}
