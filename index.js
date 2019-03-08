const readdirSync = require("fs").readdirSync;

module.exports = function(styleApi) {
  const {
    alias,
    and,
    not,
    dotSegmentCount,
    hasNoMember,
    isAbsoluteModule,
    isNodeModule,
    isRelativeModule,
    moduleName,
    unicode,
    naturally
  } = styleApi;

  const isReactModule = imported => Boolean(imported.moduleName.match(/^(react)/));
  const isPropTypesModule = imported => Boolean(imported.moduleName.match(/^(prop-types)/));
  const isReduxModule = imported => Boolean(imported.moduleName.match(/^(redux)/));
  const isLibModule = imported => Boolean(imported.moduleName.match(/lib/));

  const isActionModule = imported => Boolean(imported.moduleName.match(/actions/));
  const isReducerModule = imported => Boolean(imported.moduleName.match(/reducers/));
  const isSelectorModule = imported => Boolean(imported.moduleName.match(/selectors/));

  const isModelModule = imported => Boolean(imported.moduleName.match(/models/));
  const isContainerModule = imported => Boolean(imported.moduleName.match(/containers/));
  const isComponentModule = imported => Boolean(imported.moduleName.match(/component/));

  const isUtilModule = imported => Boolean(imported.moduleName.match(/utils/));

  const modules = readdirSync("./node_modules");
  const isFromNodeModules = imported => modules.indexOf(imported.moduleName.split("/")[0]) !== -1;

  const isConstantModule = imported => Boolean(imported.moduleName.match(/constants/));

  const isStylesModule = imported => Boolean(imported.moduleName.match(/\.(s?css|less)$/));

  return [
    // import React from 'react';
    {
      match: isReactModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    // import PropTypes from 'prop-types';
    {
      match: isPropTypesModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    // import { connect } from 'react-redux';
    {
      match: isReduxModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    // import ContainerBase from 'lib/ContainerBase';
    {
      match: isLibModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import { getLocations } from 'state/actions/locationActions';
    {
      match: isActionModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    // import locationReducer from 'state/reducers/locationReducer';
    {
      match: isReducerModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    // import locationGeoJSON from 'state/selectors/locationGeoJSON';
    {
      match: isSelectorModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import Location from 'models/Location';
    {
      match: isModelModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    // import LocationContainer from 'containers/LocationContainer';
    {
      match: isContainerModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    // import LocationDropdown from 'components/LocationDropDown';
    {
      match: isComponentModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },


    // import sanitizePhoneNumber from 'utils/sanitizePhoneNumber';
    {
      match: isUtilModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import lodash from 'lodash';
    {
      match: isNodeModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import get from 'lodash/get';
    {
      match: isFromNodeModules,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import { PENDING, FULFILLED } from 'constants/statuses';
    {
      match: isConstantModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    //
    { separator: true },

    // import './styles.css';
    { match: and(hasNoMember, isRelativeModule, isStylesModule) },

    // import styles from './Components.scss';
    {
      match: isStylesModule,
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode)
    },
    { separator: true },
    { separator: true }
  ];
}
