package controller

import (
	"net/http"
	"sheeputech/app/services/common"
)

/*
 * Login page
 */
func LoginViewHandler(w http.ResponseWriter, r *http.Request) {
	logger, _ := common.NewLogger()
	defer logger.Close()
	logger.Output(common.Info, "START", r)

	w.Write([]byte("Here is LoginViewHandler."))

	logger.Output(common.Info, "END", r)
}
