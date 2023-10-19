/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const EVENT_TYPE_TRUE = 1;

/* eslint-disable no-underscore-dangle */
export const mergeDecisionsMeta = (
  event,
  decisionsMeta,
  eventType,
  eventLabel = ""
) => {
  // Do not send a display notification with no decisions. Even empty view changes
  // should include a proposition.
  if (decisionsMeta.length === 0) {
    return;
  }
  const xdm = {
    _experience: {
      decisioning: {
        propositions: decisionsMeta,
        propositionEventType: {
          [eventType]: EVENT_TYPE_TRUE
        }
      }
    }
  };
  if (eventLabel) {
    xdm._experience.decisioning.propositionAction = {
      label: eventLabel
    };
  }
  event.mergeXdm(xdm);
};

export const mergeQuery = (event, details) => {
  event.mergeQuery({ personalization: { ...details } });
};
