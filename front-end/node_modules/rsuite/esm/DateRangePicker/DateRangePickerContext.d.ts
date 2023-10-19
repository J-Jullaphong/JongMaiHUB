import React from 'react';
interface DateRangePickerContextValue {
    isSelectedIdle?: boolean;
}
declare const DateRangePickerContext: React.Context<DateRangePickerContextValue>;
export default DateRangePickerContext;
export declare const useDateRangePickerContext: () => DateRangePickerContextValue;
