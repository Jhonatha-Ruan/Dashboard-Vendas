import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        // color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight,],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Laranja', 'Maça', 'Limão', 'Tangerina', 'Abacaxi', 'Banana'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Frutas',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: 1234, name: 'Laranja' },
              { value: 234, name: 'Maça' },
              { value: 135, name: 'Banana' },
              { value: 754, name: 'Uva' },
              { value: 549, name: 'Abacaxi' },
              { value: 854, name: 'Limão' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
