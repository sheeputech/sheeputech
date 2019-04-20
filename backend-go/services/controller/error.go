package controller

import (
	"net/http"
	"sheeputech/app/services/common"
)

// ErrorViewHandler handle errors
func ErrorViewHandler(w http.ResponseWriter, r *http.Request) {
	logger, _ := common.NewLogger()
	defer logger.Close()
	logger.Output(common.Info, "START", r)

	w.Write([]byte("Here is ErrorViewHandler."))

	logger.Output(common.Info, "END", r)
}
