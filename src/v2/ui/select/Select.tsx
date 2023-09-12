import React from "react"
import type { SelectOptionKey, SelectProps } from "./models"
import type { MouseEventHandler } from "react"

import { useMemo } from "react"
import { useToggle } from "../../utils/useToggle"
import { useClickOutside } from "../../utils/useClickOutside"
import c from "classnames"
import styled from "styled-components"

const Container = styled.div`
  position: relative;
  width: 100%;

  .select-expander {
    height: 44px;
    width: 100%;
    padding: 0 12px;
    border-radius: 4px;
    background: #2D2D2D;
    color: #000;
    min-width: 220px;
    cursor: pointer;
    color: #fff;
    border: none;
    font-size: 16px;
    line-height: 20px;
    font-family: "Lexend";

    &.empty {
      color: #9d9d9d;
    }

    &:not(.empty) {
    }

    &.opened {
      background: #535353;
      color: #fff;
      cursor: initial;
    }

    &:hover {
      background: #535353;
      color: #fff;
    }
  }

  .select-list {
    position: absolute;
    list-style: none;
    margin: 0;
    padding: 0;
    left: 0;
    transform: translateY(8px);
    width: 100%;
    background: #2D2D2D;
    border-radius: 4px;
    z-index: 1;
    max-height: 240px;
    overflow-y: auto;

    .select-list-option {
      font-size: 14px;
      letter-spacing: 0.15px;
      padding: 12px;
      color: #fff;
      cursor: pointer;

      &:not(:last-of-type) {
        border-bottom: 1px solid #535353;
      }

      &.active {
        color: #9FD1AA;
        cursor: initial;
      }

      &:hover:not(.active) {
        background: #535353;
      }
    }
  }
`

const Select = <K extends SelectOptionKey = SelectOptionKey>({
  className,
  placeholder = "Choose an option",
  value,
  options,
  initialOpen,
  onChange,
}: SelectProps<K>) => {
  const { opened, toggle, close } = useToggle({ opened: initialOpen })
  const { ref } = useClickOutside<HTMLDivElement>({
    onOutside: close,
  })

  const handleChange: MouseEventHandler<HTMLLIElement> = e => {
    const key = e.currentTarget.getAttribute("data-key")

    if (!key) {
      throw Error("Lack of key inside select list item")
    }

    close()
    onChange(key as K)
  }

  const valueToDisplay = useMemo(
    () =>
      value
        ? options.find(option => option.key === value)?.child ?? placeholder
        : placeholder,
    [value, options, placeholder]
  )

  return (
    <Container ref={ref} className={c("select", className)}>
      <button
        className={c("select-expander", "row", {
          "empty": value === "" || value === undefined,
          "opened": opened,
        })}
        onClick={toggle}
      >
        {valueToDisplay}
      </button>

      {opened && (
        <ul className="select-list">
          {options.map(({ key, child }) => (
            <li
              key={key}
              data-key={key}
              className={c("select-list-option", {
                "active": key === value,
              })}
              onClick={handleChange}
            >
              {child}
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}

export { Select }
