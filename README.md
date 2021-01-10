# Description report-lib

Library for generate paper reports with Angular projects. 
This package automatically split your data in several pages.

## Быстрый старт

1. Создайте приложение angular: `ng new my-report`
2. Установите библиотеку report-lib: `npm i report-lib`
3. В файле src/styles.css добавьте импорт стиля:
   ```
   @import '~report-lib/index.css';
   ```
   
4. Создайте компоненту шаблона отчёта  `ng g component my-report-template`
5. В созданной компоненте добавьте наследование от класса BaseReportComponent.
6. В шаблоне компоненты опишите основную структуру:
    ```
    <div repPageA4>
        <div #pagediv class="page-content">
            <!-- тут будет код шаблона -->
        </div>
    </div>
    ```
   
   Для ландшафтной ориентации использовать структуру:
    ```
    <div repPageA4 class="report-landscape">
        <div #pagediv class="page-content">
            <!-- тут будет код шаблона -->
        </div>
    </div>
    ```

7. В качестве кода шаблона пропишите три основные компоненты, из которых состоит страница отчёта: #header, #footer, #content.
Обязательным является только компонента #content, которая должна быть объявлена в цикле ngFor.
Пример:
    ```
    <table>
        <tr #header>
            <td>№ п/п</td>
            <td>Содержимое</td>
        </tr>
        <ng-container *ngFor="let content of page.items; let npp = index">
            <td>{{npp}}</td>
            <td>{{content}}</td>
        </tr>
    </table>
    ```

8. Создайте компоненту отчёта `ng g component my-report`
9. Загрузите в ней данные и создайте экземпляр класса PagesFactory.
Выполните функцию splitPages().
Проитерируйте страницы и на каждую страницу в шаблоне вызовите ваш созданный шаблон my-report-template.
В качестве параметров задайте [page], [pf], [index]

## Описание методов и полей PagesFactory
### constructor(DATA, CONTENT)

В качестве объекта DATA задайте произвольный массив. Данный массив в последующем будет делиться на страницы.
Данные массива DATA будут записаны в поле items объекта Page.
Также необязательно можно передать объект CONTENT. Данный объект будет записан в поле content объекта Page.

### pages: Array<Page>
**Read-only.**

Поле pages возвращает все страницы отчёта. 

### numPages: number
**Read-only.**

Поле numPages возвращает количество страниц отчёта.

### items: Array<PageItem>
**Read-only.**

Поле items возвращает массив DATA обернутый в объект PageItem.

### complited: boolean
**Read-only.**

Возвращает true когда построение отчёта завершено, в противном случае false.

### maximumSplitIterations: number
**Read-Write.**

Задает максимальное количество итераций построения отчёта. По-умолчанию 5.

### splitPages()
Вызывает цепочку функций для разделения исходного массива DATA на страницы.

### reset()
Сбрасывает счётчик итераций построения отчёта и повторно вызывает метод splitPages() для имеющихся данных.

## Описание полей класса Page
### content: any
Поле content содержит произвольный объект, переданный в качестве параметра CONTENT в конструктор PagesFactory.

### items: Array<PageItem>
Поле items содержит массив PageItem, хранящийся для данной страницы

### freeHeight: number
Поле freeHeight содержит высоту свободного места на странице.
Может быть использовано в шаблоне для заполнения свободного пространства.

### minimumFreeHeight: number
**Read-Write.**

Требуемое свободное место на странице. Задается в пикселях.

## Описание полей класса PageItem
### content: any
Содержит элемент массива DATA, переданный в качестве параметра в конструктор PagesFactory.

### pageNum: number
Содержит индекс страницы, на которой данный объект располагается.
