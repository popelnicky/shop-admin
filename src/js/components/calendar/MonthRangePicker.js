export default class MonthRangePicker {
  constructor(month) {
    this.month = month;
  }

  get template() {
    return `<div class="rangepicker__calendar">
                <div class="rangepicker__month-indicator">
                    <time datetime="November">November</time>
                </div>
                <div class="rangepicker__day-of-week">
                    <div>Пн</div>
                    <div>Вт</div>
                    <div>Ср</div>
                    <div>Чт</div>
                    <div>Пт</div>
                    <div>Сб</div>
                    <div>Вс</div>
                </div>
                <div class="rangepicker__date-grid">
                    <button type="button" class="rangepicker__cell" data-value="2019-11-01T17:53:50.338Z" style="--start-from: 5">1</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-02T17:53:50.338Z">2</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-03T17:53:50.338Z">3</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-04T17:53:50.338Z">4</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-05T17:53:50.338Z">5</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-06T17:53:50.338Z">6</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-07T17:53:50.338Z">7</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-08T17:53:50.338Z">8</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-09T17:53:50.338Z">9</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-10T17:53:50.338Z">10</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-11T17:53:50.338Z">11</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-12T17:53:50.338Z">12</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-13T17:53:50.338Z">13</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-14T17:53:50.338Z">14</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-15T17:53:50.338Z">15</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-16T17:53:50.338Z">16</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-17T17:53:50.338Z">17</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-18T17:53:50.338Z">18</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-19T17:53:50.338Z">19</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-20T17:53:50.338Z">20</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-21T17:53:50.338Z">21</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-22T17:53:50.338Z">22</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-23T17:53:50.338Z">23</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-24T17:53:50.338Z">24</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-25T17:53:50.338Z">25</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-26T17:53:50.338Z">26</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-27T17:53:50.338Z">27</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-28T17:53:50.338Z">28</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-29T17:53:50.338Z">29</button>
                    <button type="button" class="rangepicker__cell" data-value="2019-11-30T17:53:50.338Z">30</button>
                </div>
            </div>`;
  }
}