import React from "react"
import { Fragment } from "react"
import {
  Container,
  EdgeMarker,
  LineX,
  LineY,
  MidMarker,
  GroupItem,
} from "./components"
import { TimelineProps } from "./models"
import { DEFAULT_SETUP } from "./setup"
import { useCount } from "./utils"

export const Timeline = ({ data, setup = DEFAULT_SETUP }: TimelineProps) => {
  const count = useCount(data)

  return (
    <Container setup={setup} count={count}>
      <LineX setup={setup} count={count} data={data}>
        {data.map((group, groupIdx) => {
          return (
            <Fragment key={`group-${groupIdx}`}>
              {group.blank || <MidMarker setup={setup} groupIdx={groupIdx} />}

              {group.items.length > 0 && group.displayed && !group.blank && (
                <>
                  <LineY groupIdx={groupIdx} group={group} setup={setup} />

                  <EdgeMarker groupIdx={groupIdx} group={group} setup={setup} />

                  {group.items.map((item, itemIdx) => (
                    <GroupItem
                      key={`group-${groupIdx}-item-${itemIdx}`}
                      itemIdx={itemIdx}
                      item={item}
                      group={group}
                      groupIdx={groupIdx}
                      setup={setup}
                    />
                  ))}
                </>
              )}
            </Fragment>
          )
        })}
      </LineX>
    </Container>
  )
}
