package controller

import (
	"net/http"
	"sheeputech/app/services/common"
)

/*
 * Signup Page
 */
func SignupViewHandler(w http.ResponseWriter, r *http.Request) {
	logger, _ := common.NewLogger()
	defer logger.Close()
	logger.Output(common.Info, "START", r)

	w.Write([]byte("Here is SignupViewHandler."))

	logger.Output(common.Info, "START", r)
}
