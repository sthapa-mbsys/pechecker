export const DescriptionCheck = function (thisData, header) {
    let targettedKeywordsPosition, descriptionPosition, shortDescriptionPosition, typePosition, errorType = ""
    for (var h = 0; h < header.length; h++) {
        if (header[h] === "short description") {
            shortDescriptionPosition = h
        }
        else if (header[h] === "description") {
            descriptionPosition = h
        }
        else if (header[h] === "tags") {
            targettedKeywordsPosition = h
        }
        else if (header[h] === "type") {
            typePosition = h
        }
        if (shortDescriptionPosition && descriptionPosition && targettedKeywordsPosition && typePosition) {
            break;
        }
    }

    errorType += getShortDescriptionError(thisData, shortDescriptionPosition)

    // if(thisData[typePosition].toLowerCase()!=="variation"){  
    //     const descriptionError=getDescriptionError(thisData,descriptionPosition)
    //     if(descriptionError){
    //         if(errorType){
    //             errorType+=" --- "
    //         }
    //         errorType+=descriptionError
    //     }

    //     const targettedKeywordError=getTargettedKeywordError(thisData,targettedKeywordsPosition,descriptionPosition)
    //     if(targettedKeywordError){
    //         if(errorType){
    //             errorType+=" --- "
    //         }
    //         errorType+=targettedKeywordError
    //     }
    // }

    if (errorType) {
        return {
            error: true,
            errorType
        }
    }

    return {
        error: false
    }
}

const getDescriptionError = function (thisData, descriptionPosition) {
    let errorType = ""
    if (thisData[descriptionPosition] === "") {
        errorType = "Empty description field"
    }
    else {
        let spaceCount = 0;
        let prevSpace = false
        for (var sCount = 0; sCount < thisData[descriptionPosition].length; sCount++) {
            if (thisData[descriptionPosition][sCount] === " " && !prevSpace && thisData[descriptionPosition].length - 1 !== sCount) {
                spaceCount++;
                prevSpace = true
            }
            else {
                prevSpace = false
            }
        }
        if (spaceCount < 100 || spaceCount > 500) {
            if (errorType) {
                errorType += " --- "
            }
            errorType += "Try making description field 100-500 words"
        }
    }
    return errorType
}

const getShortDescriptionError = function (thisData, shortDescriptionPosition) {
    let errorType = ""
    if (thisData[shortDescriptionPosition] !== "") {
        errorType = "Leave Short Description Empty"
    }
    return errorType
}

const getTargettedKeywordError = function (thisData, targettedKeywordsPosition, descriptionPosition) {
    let occurence, lowFrequencyKeywords = [], errorType = "", startAt, endAt
    if (!targettedKeywordsPosition) {
        return "No targetted keyword header for analysis"
    }

    const targetKeywords = thisData[targettedKeywordsPosition].split(",")
    if (targetKeywords.length < 3 || targetKeywords.length > 7) {
        return "3-6 target keywords would be ideal"
    }

    targetKeywords.forEach(target => {
        startAt = 0
        endAt = target.length

        for (var properStartAt = 0; properStartAt < target.length; properStartAt++) {
            if (target[properStartAt] !== " ") {
                startAt = properStartAt
                break
            }
        }

        for (var properEndAt = target.length; properStartAt >= 0; properEndAt--) {
            if (target[properEndAt] !== " ") {
                endAt = properEndAt
                break
            }
        }

        target = target.substr(startAt, endAt - startAt)

        occurence = checkForOccurence(thisData[descriptionPosition], target.toLowerCase())
        if (occurence <= 1) {
            lowFrequencyKeywords.push(target)
        }
    })

    if (lowFrequencyKeywords.length === 0) return ""

    for (var c = 0; c < lowFrequencyKeywords.length; c++) {
        if (c === 0) {
            errorType += "Low occurence in description for " + lowFrequencyKeywords[c]
        }
        else {
            errorType += " --- " + lowFrequencyKeywords[c]
        }
    }

    return errorType
}

const checkForOccurence = function (hay, niddle) {
    const regex = new RegExp(`\\b${niddle}\\b`, 'gi')
    const matchResult = hay.toLowerCase().match(regex)
    if (matchResult && matchResult.length) {
        return matchResult.length
    }
    return 0
}

// |/,?${niddle},?/