package controller

import (
	"net/http"
	"sheeputech/app/services/common"
)

/*
 * Logout ( redirect only )
 */
func LogoutViewHandler(w http.ResponseWriter, r *http.Request) {
	logger, _ := common.NewLogger()
	defer logger.Close()
	logger.Output(common.Info, "START", r)

	w.Write([]byte("Here is ErrorViewHandler."))

	logger.Output(common.Info, "END", r)
}
