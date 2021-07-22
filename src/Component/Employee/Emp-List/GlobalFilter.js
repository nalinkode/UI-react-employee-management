import React from 'react';
//Internationalization
import {FormattedMessage, useIntl} from 'react-intl';

export const GlobalFilter = ({filter, setFilter}) => {
    const intl = useIntl();
    return (
        <div className="mt-2 align-end">
            {/* <FormattedMessage id="search"/> {' '} */}
            <input value={filter || ''} placeholder= {intl.formatMessage({ id: "search" })} onChange={(e) => setFilter(e.target.value)}/>
        </div>
    )
}