package common

import (
	"cloud.google.com/go/logging"
)

const (
	Info     = logging.Info     // Some noteworthy event occurred
	Warning  = logging.Warning  // Event that is not necessarily abnormal but not normal occurred
	Error    = logging.Error    // Unexpected run-time error occurred
	Critical = logging.Critical // Emergency situation occurred that coused abnormal termination of service
)

const (
	GoogleCloudProjectID = "sheeputech-224011"
	GoogleCloudLogName   = "sheeputech"
)
