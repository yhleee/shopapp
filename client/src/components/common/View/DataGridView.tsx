import * as React from 'react'
import * as s from './View.scss'
import { styling } from 'common/utils'
import typeChecker from 'common/typeChecker'
import { DynamicCx } from 'common/types/style'

interface OwnProps {
  cx?: DynamicCx
  cols?: number[]
  titles?: any[]
  contents?: any[]
}

type Props = OwnProps

/**
 * 적응형 Table형태의 View.
 * 너비 600px 이하의 경우엔 vertical 타입으로 화면이 바뀐다.
 *
 * cols: 기본은 균등분할 (너비를 정해주고자 할때만 넣어준다 - 12분할 ex) 2,3,4,4)
 * titles: 제목 배열
 * contents: 노출할 데이터들 (없는 경우 null) - 1/2차원 배열 가능
 * ex)
 * <DataGridView
 *     cols={[2,3,4,4]}
 *     titles={['A', 'B', 'C', 'D']}
 *     contents={['AA', 'BB', 'CC', 'DD']}
 *     or
 *     contents={['AA', 'BB', null, 'DD']}
 *     or
 *     contents={[
 *         ['1-1', '1-2', '1-3', '1-4']
 *         ['2-1', '2-2', '2-3', '2-4']
 *     ]}
 * />
 */
const DataGridView: React.SFC<Props> = ({ cx, cols, titles, contents }) => {
  let titleData: JSX.Element
  let contentData: JSX.Element | JSX.Element[]
  const isMultipleData: boolean = contents && typeChecker.isArray(contents[0])

  titleData = titles && (
    <tr>
      {titles.map((title, index) => {
        const width = cols && 100 / 12 * cols[index]
        return (
          <th key={`title-${index}`} style={{ width: `${width}%` }}>
            <span>{title}</span>
          </th>
        )
      })}
    </tr>
  )

  // 여러개의 데이터를 가지고 있는 경우
  contentData = isMultipleData ? (
    contents.map((content, index) => {
      return (
        <tr key={`column-${index}`}>
          {content.map((obj, indexJ) => (
            <td key={`row-${indexJ}`} data-th={titles[indexJ]}>
              <span>{obj}</span>
            </td>
          ))}
        </tr>
      )
    })
  ) : (
    <tr>
      {contents.map((content, index) => (
        <td key={`row-${index}`} data-th={titles[index]}>
          <span>{content}</span>
        </td>
      ))}
    </tr>
  )

  return (
    <div className={cx('table-view')}>
      <table className={cx('table')}>
        <thead>{titleData}</thead>
        <tbody>{contentData}</tbody>
      </table>
    </div>
  )
}

const styled = styling(s)(DataGridView)
export default styled
