import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { M, S } from "../../ui"
import AuthorAvatar from "../../components/article/AuthorAvatar"
import type { UserBadgeProps } from "./models"

const Personality = styled.div`
  margin-left: 14px;
`

export const UserBadge = ({ avatar, fullName, role, mini }: UserBadgeProps) => {
    return (
        <Link to="/authors/">
            <div className="clickable row">
                <AuthorAvatar avatar={avatar} />
                {mini || (
                    <Personality className="col">
                        <M className="cap" bold>{fullName}</M>
                        <S>{role}</S>
                    </Personality>
                )}
            </div>
        </Link>
    )
}
