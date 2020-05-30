package actions

import "encoding/json"

type Action interface {
	GetType() int
}

const (
	MOVE = iota + 1
)

type BaseAction struct {
	actionType int
}

func (a BaseAction) getType() int {
	return a.actionType
}

func ParseAction(actionType int, data []byte) Action {
	switch actionType {
	case MOVE:
	default:
	}
}
